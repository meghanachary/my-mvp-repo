--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists topics;
SET foreign_key_checks = 1;

--
-- Create Tables
--

CREATE TABLE topics(
    id INT NOT NULL AUTO_INCREMENT, 
    topic VARCHAR(40) not null,
    PRIMARY KEY (id)
    );
