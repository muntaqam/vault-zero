from sqlmodel import SQLModel, create_engine
from config import DATABASE_URL

engine = create_engine(DATABASE_URL, echo= True)

def init_db():
    SQLModel.metadata.create_all(engine)

if __name__ == "__main__":
    init_db()
    print("✅ Database initialized!")
