INSERT INTO transaction_type 
(name) 
VALUES 
("incoming"),
("outgoing");

INSERT INTO reason
(name, transaction_type_id)
VALUES
("other",1),
("other",2);