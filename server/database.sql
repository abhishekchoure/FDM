create table deposits(
	deposit_id int8 primary key auto_increment,
	fd_no int8 unique not null,
    bank varchar(50) not null,
    owner varchar(50) not null,
    amount double not null,
    start_date date not null,
    maturity_date date not null,
    interest float not null,
    maturity_amount double not null
);