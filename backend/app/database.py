from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

db_username = "postgres"
db_password = ""
db_hostname = "localhost"
db_port = "5432"
db_name = "blogapp"

SQLALCHEMY_DATABASE_URL = f"postgresql://{db_username}:{db_password}@{db_hostname}:{db_port}/{db_name}"
# SQLALCHEMY_DATABASE_URL = f"postgresql://{settings.db_username}:{settings.db_password}@{settings.db_hostname}:{settings.db_port}/{settings.db_name}"

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """Dependency for using ORM"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
