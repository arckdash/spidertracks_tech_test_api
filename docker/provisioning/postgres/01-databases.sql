# create root user and grant rights
CREATE USER 'spidertracks'@'localhost' IDENTIFIED BY 'local';
GRANT ALL ON *.* TO 'spidertracks'@'%';