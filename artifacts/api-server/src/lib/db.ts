import pg from "pg";

const { Pool } = pg;

let _pool: pg.Pool | null = null;

function getPool(): pg.Pool {
  if (!_pool) {
    const url = process.env["DATABASE_URL"];
    if (!url) throw new Error("DATABASE_URL is not configured");
    _pool = new Pool({ connectionString: url });
  }
  return _pool;
}

type SqlResult = Record<string, unknown>[];

export function getSql() {
  return async function sql(strings: TemplateStringsArray, ...values: unknown[]): Promise<SqlResult> {
    let query = "";
    const params: unknown[] = [];
    strings.forEach((str, i) => {
      query += str;
      if (i < values.length) {
        params.push(values[i]);
        query += `$${params.length}`;
      }
    });
    const pool = getPool();
    const result = await pool.query(query, params);
    return result.rows;
  };
}

export async function initSchema(): Promise<void> {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS auth_codes (
      user_id   TEXT PRIMARY KEY,
      code      TEXT NOT NULL,
      user_data JSONB NOT NULL,
      created_at BIGINT NOT NULL,
      expires_at BIGINT NOT NULL,
      attempts  INT NOT NULL DEFAULT 0
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS tw_profiles (
      user_id            TEXT PRIMARY KEY,
      discord_username   TEXT NOT NULL,
      username           TEXT UNIQUE NOT NULL,
      display_name       TEXT NOT NULL,
      bio                TEXT DEFAULT '',
      avatar_base64      TEXT,
      header_base64      TEXT,
      verified           BOOLEAN DEFAULT FALSE,
      password           TEXT,
      fake_follower_count INT DEFAULT 0,
      followers          JSONB DEFAULT '[]',
      following          JSONB DEFAULT '[]',
      created_at         TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS tw_tweets (
      id           TEXT PRIMARY KEY,
      author_id    TEXT NOT NULL,
      content      TEXT DEFAULT '',
      image_base64 TEXT,
      likes        JSONB DEFAULT '[]',
      retweeted_by JSONB DEFAULT '[]',
      reply_to     TEXT,
      retweet_of   TEXT,
      created_at   TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS tw_notifications (
      id           TEXT PRIMARY KEY,
      type         TEXT NOT NULL,
      from_user_id TEXT NOT NULL,
      to_user_id   TEXT NOT NULL,
      tweet_id     TEXT,
      created_at   TIMESTAMPTZ DEFAULT NOW(),
      read         BOOLEAN DEFAULT FALSE
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS msg_profiles (
      user_id      TEXT PRIMARY KEY,
      phone        TEXT UNIQUE NOT NULL,
      name         TEXT DEFAULT '',
      family_name  TEXT DEFAULT '',
      bio          TEXT DEFAULT '',
      avatar_base64 TEXT,
      username     TEXT DEFAULT '',
      display_name TEXT DEFAULT '',
      updated_at   TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS msg_config (
      key   TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `;
  await sql`INSERT INTO msg_config (key, value) VALUES ('next_phone', '1001') ON CONFLICT DO NOTHING`;
  await sql`
    CREATE TABLE IF NOT EXISTS msg_chats (
      chat_key   TEXT NOT NULL,
      id         TEXT PRIMARY KEY,
      from_id    TEXT NOT NULL,
      to_id      TEXT NOT NULL,
      content    TEXT NOT NULL,
      type       TEXT DEFAULT 'text',
      sender_name TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_msg_chats_key ON msg_chats(chat_key)`;
  await sql`
    CREATE TABLE IF NOT EXISTS msg_groups (
      id           TEXT PRIMARY KEY,
      name         TEXT NOT NULL,
      avatar_base64 TEXT,
      admin_id     TEXT NOT NULL,
      members      JSONB DEFAULT '[]',
      created_at   TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}
