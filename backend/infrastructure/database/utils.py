from infrastructure.database.base import SessionLocal


def get_db_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
