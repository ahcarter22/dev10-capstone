drop database if exists warehouse_prod;
create database warehouse_prod;
use warehouse_prod;

create table vendor(
    vendor_id int primary key auto_increment,
    vendor_name varchar(50) not null,
    vendor_email varchar(50) not null,
    vendor_phone varchar(20) not null
); 

create table category (
    category_id int primary key auto_increment,
    category_name varchar(20) not null
);

create table item (
    item_id int primary key auto_increment,
    item_name varchar(30) not null,
    quantity int not null,
    constraint fk_item_vendor_id
       foreign key (vendor_id)
       references vendor(vendor_id),
	constraint fk_item_category_id
       foreign key (category_id)
       references category(category_id)
);

create table app_user (
    app_user_id int primary key auto_increment,
    username varchar(50) not null unique,
    password_hash varchar(2048) not null,
    disabled bit not null default(0)
);

create table app_role (
    app_role_id int primary key auto_increment,
    `name` varchar(50) not null unique
);

create table app_user_role (
    app_user_id int not null,
    app_role_id int not null,
    constraint pk_app_user_role
        primary key (app_user_id, app_role_id),
    constraint fk_app_user_role_user_id
        foreign key (app_user_id)
        references app_user(app_user_id),
    constraint fk_app_user_role_role_id
        foreign key (app_role_id)
        references app_role(app_role_id)
);

insert into vendor (vendor_name, vendor_email, vendor_phone)
   values
   ("Johnny's Apples", 'apples@johnny.com','347-123-0055'),
   ('Meats For Us', 'meats@meats.com','929-345-0123'),
   ('Millennial Avocados','avocados@millennial.org', '646-235-2215');

insert into app_role (`name`) values
    ('EMPLOYEE'),
    ('ADMIN');

-- passwords are set to "P@ssw0rd!"
insert into app_user (username, password_hash, disabled)
    values
    ('john@smith.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0),
    ('sally@jones.com', '$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa', 0);

insert into app_user_role
    values
    (1, 2),
    (2, 1);



