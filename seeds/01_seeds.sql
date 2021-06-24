/* insert into users table */
INSERT INTO users (id, name, email, password)
VALUES (1, 'Jon Bon Jovi', 'jon@bonjovi.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(2, 'Richie Sambora', 'richie@bonjovi.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(3, 'David Brian', 'david@bonjovi.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(4, 'Tico Tores', 'tico@bonjovi.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
/* insert into properties */
INSERT INTO properties (id, owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 1, 'Dream House', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 300,  3, 2, 3, 'Russia', 'Oyunskogo 6', 'Yakutsk', 'Sakha Republic', '6770277', TRUE),
(2, 2, 'Dream Apartment', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 300,  3, 2, 3, 'Russia', 'Turgeneva 10', 'Yakutsk', 'Sakha Republic', '6770277', TRUE),
(3, 3, 'Cozy Home', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 300,  3, 2, 3, 'Russia', 'Tverskaua 10', 'Moscow', 'Moscow', '125000', TRUE),
(4, 4, 'Cozy Apartment', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 300,  3, 2, 3, 'Russia', 'Arbat 10', 'Moscow', 'Moscow', '125023', TRUE);
/* insert into reservations */
INSERT INTO reservations (id, start_date, end_date, property_id, guest_id)
VALUES (1, '2021-06-23', '2021-06-25', 1, 1),
(2, '2021-06-23', '2021-06-25', 2, 2),
(3, '2021-06-23', '2021-06-25', 2, 2),
(4, '2021-06-23', '2021-06-25', 2, 2);
/* insert into property reviews*/
INSERT INTO property_reviews (id, guest_id, property_id, reservation_id, rating, message) 
VALUES (1, 1, 1, 1, 5, 'messages'),
(2, 2, 2, 2, 5, 'messages'),
(3, 3, 3, 3, 5, 'messages'),
(4, 4, 4, 4, 5, 'messages');