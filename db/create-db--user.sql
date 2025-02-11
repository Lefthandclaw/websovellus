-- User creation example, replace 'user' & 'password'
CREATE USER 'root'@'localhost' IDENTIFIED BY '12313';
GRANT ALL PRIVILEGES ON `HealthDiary`.* TO 'user'@'localhost';
FLUSH PRIVILEGES;