drop database if exists warehouse_prod;
create database warehouse_prod;
use warehouse_prod;

create table vendor(
    vendor_id int primary key auto_increment,
    vendor_name varchar(50) not null,
    vendor_email varchar(50) not null,
    vendor_phone varchar(20) not null,
    vendor_imageUrl varchar(500) 
); 

create table category (
    category_id int primary key auto_increment,
    category_name varchar(20) not null
);

create table item (
    item_id int primary key auto_increment,
    item_name varchar(30) not null,
    quantity int not null,
    scale varchar(40) not null,
    expiration_date date not null,
    imageUrl varchar(500),
    vendor_id int not null,
    category_id int not null,
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



insert into vendor (vendor_name, vendor_email, vendor_phone, vendor_imageUrl)
   values
   ("Johnny's Apples", 'apples@johnny.com','347-123-0055',"https://cdn.freelogodesign.org/files/b3c1bb6a59f045309ce4fccbcf5da165/thumb/logo_200x200.png?v=0"),
   ('Meats For Us', 'meats@meats.com','929-345-0123',"https://cdn.freelogodesign.org/files/5c5b4ccbc270405fb7961c4b6fd9a59c/thumb/logo_200x200.png?v=0"),
   ('Millennial Avocados','avocados@mill.org', '646-235-2215',"https://cdn.freelogodesign.org/files/cb262064f88c46e49539c1b7579e06eb/thumb/logo_200x200.png?v=0"),
   ("Brilliant Bread Company", 'ltorvalds01@gmail.com','247-658-1658',"https://cdn.freelogodesign.org/files/4d694abdcfdf4f988390dc4e1ff13785/thumb/logo_200x200.png?v=0"),
   ('Crayon Army', 'crayon@army.com','412-589-1147',"https://cdn.freelogodesign.org/files/a3c4324d031146d88cf83d74bb42cf2d/thumb/logo_200x200.png?v=0"),
   ("Mr.Freezie's Smashing Delights",'ahcarter22@gmail.com', '646-235-2215',"https://cdn.freelogodesign.org/files/92dbbacbd24640c696adb862a7702a23/thumb/logo_200x200.png?v=0");
   
insert into app_role (`name`) values
    ('USER'),
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
   
   insert into category(category_name) values
	('MEATS'),
    ('PRODUCE'),
    ('DAIRY'),
    ('FROZEN'),
    ('ALCOHOL'),
    ('BAKED GOODS');

   insert into item(item_name,quantity,scale,expiration_date,imageUrl,vendor_id,category_id) values
    ("Johnny's Awesome Apple",100,'pounds','2020-10-05','https://i.epochtimes.com/assets/uploads/2019/12/Fotolia_84273812_Subscription_L.jpg',1,2),
    ('Brand Name Beef Sirloin',150,'pounds','2001-01-01','https://embed.widencdn.net/img/beef/melpznnl7q/800x600px/Top%20Sirloin%20Steak.psd?keep=c&u=7fueml',2,1),
    ('Antiboomer Avocado',200,'pounds','2005-09-11','https://www.kroger.com/product/images/large/front/0000000004225',3,2),
    ("Bangin Bread",3,'loaves','2022-10-05','https://www.houseofwellness.com.au/wp-content/uploads/2020/09/HOW-LH-banana-bread.jpg',6,6),
    ('Crayon Army Draft Beer',150,'bottles','2025-11-24',"https://i.etsystatic.com/26215724/r/il/be4697/3386040000/il_fullxfull.3386040000_o10u.jpg",5,5),
    ('Mr.Freezie Ice Cream',5,'cartons','2025-09-11','https://www.awesomealpharetta.com/wp-content/uploads/2020/06/ice_cream_cones_blog.jpg',4,4),
    ("Honeycrisp Apple",90,'pounds','2023-01-04','https://images.heb.com/is/image/HEBGrocery/000466634',1,2);

