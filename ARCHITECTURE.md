# Архитектура БД

Схема для переноса на реальный бэкенд (Supabase/Postgres).

## Таблицы

### users

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### lessons

```sql
CREATE TABLE lessons (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  order_index INTEGER NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### user_lesson_progress

```sql
CREATE TABLE user_lesson_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL CHECK (status IN ('done', 'active', 'locked')),
  completed_at TIMESTAMP,
  UNIQUE(user_id, lesson_id)
);

CREATE INDEX idx_user_progress ON user_lesson_progress(user_id, lesson_id);
```

## Логика

Связь `users <-> user_lesson_progress <-> lessons` (many-to-many).

При завершении урока триггер открывает следующий:

```sql
CREATE OR REPLACE FUNCTION update_lesson_statuses()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'done' AND OLD.status != 'done' THEN
    UPDATE user_lesson_progress
    SET status = 'active'
    WHERE user_id = NEW.user_id
      AND lesson_id = (
        SELECT id FROM lessons
        WHERE order_index = (
          SELECT order_index + 1
          FROM lessons
          WHERE id = NEW.lesson_id
        )
      )
      AND status = 'locked';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_lesson_status
AFTER UPDATE ON user_lesson_progress
FOR EACH ROW
EXECUTE FUNCTION update_lesson_statuses();
```

## API

RPC функция для получения списка со статусами:

```sql
CREATE OR REPLACE FUNCTION get_user_lessons_with_status(user_uuid UUID)
RETURNS TABLE (
  id INTEGER,
  title VARCHAR,
  status VARCHAR,
  order_index INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    l.id,
    l.title,
    COALESCE(ulp.status, 'locked') as status,
    l.order_index
  FROM lessons l
  LEFT JOIN user_lesson_progress ulp
    ON l.id = ulp.lesson_id AND ulp.user_id = user_uuid
  ORDER BY l.order_index ASC;
END;
$$ LANGUAGE plpgsql;
```

## Фронт

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function fetchUserLessons(userId: string) {
	const { data, error } = await supabase.rpc('get_user_lessons_with_status', {
		user_uuid: userId,
	})

	if (error) throw error
	return data
}

async function completeLesson(userId: string, lessonId: number) {
	const { error } = await supabase
		.from('user_lesson_progress')
		.update({
			status: 'done',
			completed_at: new Date().toISOString(),
		})
		.match({ user_id: userId, lesson_id: lessonId })

	if (error) throw error
}
```

## При регистрации

```sql
INSERT INTO user_lesson_progress (user_id, lesson_id, status)
SELECT
  'new_user_uuid',
  id,
  CASE
    WHEN order_index = 1 THEN 'active'
    ELSE 'locked'
  END
FROM lessons
ORDER BY order_index;
```
