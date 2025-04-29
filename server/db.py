from sqlmodel import SQLModel, create_engine, Session
from config import DATABASE_URL
from server.models.user import User
from server.models.password_entry import PasswordEntry

engine = create_engine(DATABASE_URL, echo= True)

def init_db():
    SQLModel.metadata.create_all(engine)
    print("Tables created")

def get_session():
    with Session(engine) as session:
        yield session


if __name__ == "__main__":
    init_db()
    print("Database initialized!")
