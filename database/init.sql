-- BrasilCodeGap Database Schema
-- This script initializes the database with tables for the BrasilCodeGap platform

-- Create database if not exists (this will be handled by docker-compose)
-- CREATE DATABASE brasilcodegap;

-- Connect to the database
\c brasilcodegap;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    profession VARCHAR(255),
    experience VARCHAR(50),
    linkedin_url TEXT,
    github_url TEXT,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    technologies TEXT[] DEFAULT '{}',
    image_url TEXT,
    instructor_id INTEGER REFERENCES users(id),
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Course enrollments table
CREATE TABLE IF NOT EXISTS course_enrollments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    UNIQUE(user_id, course_id)
);

-- Course ratings table
CREATE TABLE IF NOT EXISTS course_ratings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, course_id)
);

-- Course lessons table
CREATE TABLE IF NOT EXISTS course_lessons (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT,
    video_url TEXT,
    duration_minutes INTEGER DEFAULT 0,
    order_index INTEGER DEFAULT 0,
    is_free BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User progress table
CREATE TABLE IF NOT EXISTS user_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    lesson_id INTEGER REFERENCES course_lessons(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT FALSE,
    watched_duration INTEGER DEFAULT 0,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, lesson_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_instructor ON courses(instructor_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON course_enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON course_enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_ratings_course ON course_ratings(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_course ON course_lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_progress_user ON user_progress(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ratings_updated_at BEFORE UPDATE ON course_ratings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON course_lessons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_progress_updated_at BEFORE UPDATE ON user_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO users (name, email, password, profession, experience, is_admin) VALUES
('Admin BrasilCodeGap', 'admin@brasilcodegap.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrador', 'senior', true),
('João Silva', 'joao@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Desenvolvedor Frontend', 'intermediario', false),
('Maria Santos', 'maria@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Desenvolvedor Backend', 'junior', false)
ON CONFLICT (email) DO NOTHING;

-- Insert sample courses
INSERT INTO courses (title, description, category, duration, technologies, image_url, instructor_id) VALUES
('React Avançado: Do Zero ao Deploy', 'Aprenda React do básico ao avançado com projetos práticos e deploy em produção.', 'Frontend', '42h', ARRAY['React', 'TypeScript', 'Next.js', 'Tailwind'], 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop', 1),
('Python para Data Science', 'Domine Python para análise de dados, machine learning e visualização.', 'Data Science', '35h', ARRAY['Python', 'Pandas', 'NumPy', 'Scikit-learn'], 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop', 1),
('DevOps com Docker e Kubernetes', 'Aprenda containerização e orquestração para deploy escalável.', 'DevOps', '28h', ARRAY['Docker', 'Kubernetes', 'AWS', 'CI/CD'], 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop', 1),
('Node.js e APIs REST', 'Construa APIs robustas e escaláveis com Node.js e Express.', 'Backend', '32h', ARRAY['Node.js', 'Express', 'MongoDB', 'JWT'], 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop', 1),
('React Native: Apps Multiplataforma', 'Desenvolva aplicativos mobile para iOS e Android com React Native.', 'Mobile', '38h', ARRAY['React Native', 'Expo', 'TypeScript', 'Redux'], 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop', 1),
('AWS Cloud Fundamentals', 'Domine os serviços essenciais da AWS para cloud computing.', 'Cloud', '25h', ARRAY['AWS', 'EC2', 'S3', 'Lambda'], 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop', 1)
ON CONFLICT DO NOTHING;

-- Insert sample ratings
INSERT INTO course_ratings (user_id, course_id, rating, comment) VALUES
(2, 1, 5, 'Excelente curso! Muito bem estruturado.'),
(3, 1, 4, 'Conteúdo muito bom, recomendo.'),
(2, 2, 5, 'Perfeito para iniciantes em Data Science.'),
(3, 3, 4, 'Ótimo curso de DevOps.')
ON CONFLICT DO NOTHING;

-- Insert sample enrollments
INSERT INTO course_enrollments (user_id, course_id) VALUES
(2, 1),
(2, 2),
(3, 1),
(3, 3)
ON CONFLICT DO NOTHING;

-- Grant permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;

-- Display database info
SELECT 'BrasilCodeGap Database initialized successfully!' as status; 