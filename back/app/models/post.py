from sqlalchemy import Column, Integer, String, Boolean, ARRAY, Date
from app.database import Base

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(String)
    excerpt = Column(String, nullable=True)
    category = Column(String, nullable=True)
    author = Column(String)
    date = Column(Date, nullable=True)
    readTime = Column(String, nullable=True)
    image = Column(String, nullable=True)
    featured = Column(Boolean, default=False)
    tags = Column(ARRAY(String), default=[])
    type = Column(String)  # news, event, blog
