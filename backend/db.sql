--
-- PostgreSQL database dump
--

-- Dumped from database version 14.12 (Ubuntu 14.12-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.12 (Ubuntu 14.12-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cart_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_item (
    id integer NOT NULL,
    session_id integer,
    product_id integer,
    quantity integer DEFAULT 0,
    created_at timestamp without time zone NOT NULL,
    modified_at timestamp without time zone,
    CONSTRAINT quantity_bigger_than_0 CHECK ((quantity > 0))
);


ALTER TABLE public.cart_item OWNER TO postgres;

--
-- Name: discount; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.discount (
    id integer NOT NULL,
    discount_percent integer DEFAULT 0 NOT NULL,
    active boolean,
    created_at timestamp without time zone NOT NULL,
    modified_at timestamp without time zone,
    deleted_at timestamp without time zone,
    CONSTRAINT discount_percent_bigger_than_0 CHECK ((discount_percent > 0))
);


ALTER TABLE public.discount OWNER TO postgres;

--
-- Name: order_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_details (
    id integer NOT NULL,
    user_id integer,
    total integer DEFAULT 0,
    payment_id integer,
    created_at timestamp without time zone NOT NULL,
    modified_at timestamp without time zone,
    CONSTRAINT total_bigger_than_0 CHECK ((total > 0))
);


ALTER TABLE public.order_details OWNER TO postgres;

--
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    id integer NOT NULL,
    order_id integer,
    product_id integer,
    quantity integer DEFAULT 0,
    created_at timestamp without time zone NOT NULL,
    modified_at timestamp without time zone,
    CONSTRAINT quantity_bigger_than_0 CHECK ((quantity > 0))
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- Name: payment_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payment_details (
    id integer NOT NULL,
    order_id integer,
    amount numeric(12,2),
    provider character varying(255),
    status character varying(255),
    created_at timestamp without time zone NOT NULL,
    modified_at timestamp without time zone,
    CONSTRAINT amount_bigger_than_0 CHECK ((amount > (0)::numeric))
);


ALTER TABLE public.payment_details OWNER TO postgres;

--
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    stock_keeping_unit character varying(255) NOT NULL,
    category_id integer,
    inventory_id integer,
    price numeric(12,2) DEFAULT 0.00 NOT NULL,
    discount_id integer,
    created_at timestamp without time zone NOT NULL,
    modified_at timestamp without time zone,
    deleted_at timestamp without time zone,
    CONSTRAINT price_bigger_than_0 CHECK ((price > (0)::numeric))
);


ALTER TABLE public.product OWNER TO postgres;

--
-- Name: product_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_category (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    modified_at timestamp without time zone,
    deleted_at timestamp without time zone
);


ALTER TABLE public.product_category OWNER TO postgres;

--
-- Name: product_inventory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_inventory (
    id integer NOT NULL,
    quantity integer DEFAULT 0,
    created_at timestamp without time zone NOT NULL,
    modified_at timestamp without time zone,
    deleted_at timestamp without time zone
);


ALTER TABLE public.product_inventory OWNER TO postgres;

--
-- Name: shopping_session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shopping_session (
    id integer NOT NULL,
    user_id integer,
    total integer DEFAULT 0 NOT NULL,
    created_at timestamp without time zone NOT NULL,
    modified_at timestamp without time zone
);


ALTER TABLE public.shopping_session OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password text NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    telephone character varying(255),
    created_at timestamp without time zone NOT NULL,
    modified_at timestamp without time zone NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_address (
    id integer NOT NULL,
    user_id integer,
    address_line1 character varying(255),
    address_line2 character varying(255),
    city character varying(255),
    postal_code character varying(55),
    country character varying(128),
    telephone character varying(255),
    mobile character varying(255)
);


ALTER TABLE public.user_address OWNER TO postgres;

--
-- Name: user_payment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_payment (
    id integer NOT NULL,
    user_id integer,
    payment_type character varying(128),
    provider character varying(128),
    account_no integer,
    expiry date
);


ALTER TABLE public.user_payment OWNER TO postgres;

--
-- Data for Name: cart_item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart_item (id, session_id, product_id, quantity, created_at, modified_at) FROM stdin;
\.


--
-- Data for Name: discount; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.discount (id, discount_percent, active, created_at, modified_at, deleted_at) FROM stdin;
1	5	f	2024-06-23 22:11:50.164558	\N	\N
2	10	f	2024-06-23 22:11:50.164558	\N	\N
3	15	f	2024-06-23 22:11:50.164558	\N	\N
4	20	f	2024-06-23 22:11:50.164558	\N	\N
5	25	f	2024-06-23 22:11:50.164558	\N	\N
6	30	f	2024-06-23 22:11:50.164558	\N	\N
7	35	f	2024-06-23 22:11:50.164558	\N	\N
8	40	f	2024-06-23 22:11:50.164558	\N	\N
9	45	f	2024-06-23 22:11:50.164558	\N	\N
10	50	f	2024-06-23 22:11:50.164558	\N	\N
11	55	f	2024-06-23 22:11:50.164558	\N	\N
12	60	f	2024-06-23 22:11:50.164558	\N	\N
13	65	f	2024-06-23 22:11:50.164558	\N	\N
14	70	f	2024-06-23 22:11:50.164558	\N	\N
15	75	f	2024-06-23 22:11:50.164558	\N	\N
16	80	f	2024-06-23 22:11:50.164558	\N	\N
17	85	f	2024-06-23 22:11:50.164558	\N	\N
18	90	f	2024-06-23 22:11:50.164558	\N	\N
19	95	f	2024-06-23 22:11:50.164558	\N	\N
20	100	f	2024-06-23 22:11:50.164558	\N	\N
\.


--
-- Data for Name: order_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_details (id, user_id, total, payment_id, created_at, modified_at) FROM stdin;
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_items (id, order_id, product_id, quantity, created_at, modified_at) FROM stdin;
\.


--
-- Data for Name: payment_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payment_details (id, order_id, amount, provider, status, created_at, modified_at) FROM stdin;
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product (id, name, description, stock_keeping_unit, category_id, inventory_id, price, discount_id, created_at, modified_at, deleted_at) FROM stdin;
1	Baldur\\s Gate 3	An rpg game where you make your own decisions.	20	50	1	100.00	\N	2024-06-23 20:12:55.078383	\N	\N
2	XCOM Enemy Unknown	A tactical, strategic game where you command your squad of marines to defeat invading aliens.	14	4	2	79.00	\N	2024-06-23 20:12:55.078383	\N	\N
3	Counter-Strike Global Offensive	A competive first-person shooter.	100	1	3	25.00	\N	2024-06-23 20:12:55.078383	\N	\N
4	Counter-Strike: Source	A competive first-person shooter.	40	1	4	10.00	\N	2024-06-23 20:12:55.078383	\N	\N
5	Need For Speed: Underground 2	Explore the open world city in Underground 2, where players can explore the city, unlocking areas by completing races.	6	6	5	10.00	\N	2024-06-23 20:12:55.078383	\N	\N
6	FIFA 12	Competitive Soccer Game	37	5	6	37.00	\N	2024-06-23 20:12:55.078383	\N	\N
7	Age of Empires 3	Age of Empires III portrays the European colonization of the Americas, between approximately 1492 and 1876 AD. Command one of eight mighty European powers and colonize vast, uncharted territory.	4	4	7	15.00	\N	2024-06-23 20:12:55.078383	\N	\N
8	Farming Simulator 	Farming Simulator is a farming simulation video game series developed by GIANTS Software.	123	3	8	20.00	\N	2024-06-23 20:12:55.078383	\N	\N
9	The Legend of Zelda: Breath of the Wild	After a 100-year slumber, Link wakes up alone in a world he no longer remembers. Now the legendary hero must explore a vast and dangerous land and regain his memories before Hyrule is lost forever. Armed only with what he can scavenge, Link sets out to find answers and the resources needed to survive.	150	2	9	60.00	\N	2024-06-23 20:12:55.078383	\N	\N
10	Portal	A test subject wakes up in a scientific facility controlled by a sadistic artificial intelligence and must escape with the help of the only instrument she has -a gun that makes portals.	40	118	10	13.00	\N	2024-06-23 20:12:55.078383	\N	\N
11	StarCraft 2	Four years after the events of StarCraft: Brood War (1998), Jim Raynor fights against the Dominion and begins a search for artifacts when at the same time the Zerg attack once again.	80	4	11	270.00	\N	2024-06-23 20:12:55.078383	\N	\N
\.


--
-- Data for Name: product_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_category (id, name, created_at, modified_at, deleted_at) FROM stdin;
1	Action	2024-06-22 15:39:56.3	\N	\N
2	Adventure	2024-06-22 15:39:56.3	\N	\N
118	Puzzle	2024-06-22 15:39:56.3	\N	\N
6	Racing / Driving	2024-06-22 15:39:56.3	\N	\N
50	Role-playing (RPG)	2024-06-22 15:39:56.3	\N	\N
3	Simulation	2024-06-22 15:39:56.3	\N	\N
5	Sports	2024-06-22 15:39:56.3	\N	\N
4	Strategy / tactics	2024-06-22 15:39:56.3	\N	\N
\.


--
-- Data for Name: product_inventory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_inventory (id, quantity, created_at, modified_at, deleted_at) FROM stdin;
1	15	2024-06-23 21:55:27.221979	\N	\N
2	100	2024-06-23 21:55:27.221979	\N	\N
3	40	2024-06-23 21:55:27.221979	\N	\N
4	112	2024-06-23 21:55:27.221979	\N	\N
5	8	2024-06-23 21:55:27.221979	\N	\N
6	66	2024-06-23 21:55:27.221979	\N	\N
7	23	2024-06-23 21:55:27.221979	\N	\N
8	200	2024-06-23 21:55:27.221979	\N	\N
9	49	2024-06-23 21:55:27.221979	\N	\N
10	78	2024-06-23 21:55:27.221979	\N	\N
11	2	2024-06-23 21:55:27.221979	\N	\N
12	25	2024-06-23 21:55:27.221979	\N	\N
\.


--
-- Data for Name: shopping_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shopping_session (id, user_id, total, created_at, modified_at) FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, username, password, first_name, last_name, telephone, created_at, modified_at) FROM stdin;
1	john0049	snow0049	John	Snow	45436435634	2024-06-23 22:45:07.185584	2024-06-23 22:45:07.185584
\.


--
-- Data for Name: user_address; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_address (id, user_id, address_line1, address_line2, city, postal_code, country, telephone, mobile) FROM stdin;
1	1	Georgi Benkovski 32	Dolno More 2	Varna	6000	Bulgaria	+35956321490	+35912345678
\.


--
-- Data for Name: user_payment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_payment (id, user_id, payment_type, provider, account_no, expiry) FROM stdin;
1	1	debit_card	OBB	654920	2024-06-23
\.


--
-- Name: cart_item cart_item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT cart_item_pkey PRIMARY KEY (id);


--
-- Name: discount discount_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discount
    ADD CONSTRAINT discount_pkey PRIMARY KEY (id);


--
-- Name: order_details order_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: payment_details payment_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_details
    ADD CONSTRAINT payment_details_pkey PRIMARY KEY (id);


--
-- Name: product_category product_category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_category
    ADD CONSTRAINT product_category_pkey PRIMARY KEY (id);


--
-- Name: product_inventory product_inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_inventory
    ADD CONSTRAINT product_inventory_pkey PRIMARY KEY (id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: shopping_session shopping_session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_session
    ADD CONSTRAINT shopping_session_pkey PRIMARY KEY (id);


--
-- Name: user_address user_address_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_address
    ADD CONSTRAINT user_address_pkey PRIMARY KEY (id);


--
-- Name: user_payment user_payment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_payment
    ADD CONSTRAINT user_payment_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: cart_item cart_item_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT cart_item_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: cart_item cart_item_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT cart_item_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.shopping_session(id);


--
-- Name: product category_id_product_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT category_id_product_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.product_category(id);


--
-- Name: product discount_id_discount_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT discount_id_discount_id_fkey FOREIGN KEY (discount_id) REFERENCES public.discount(id);


--
-- Name: product inventory_id_product_inventory_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT inventory_id_product_inventory_id_fkey FOREIGN KEY (inventory_id) REFERENCES public.product_inventory(id);


--
-- Name: order_details order_details_payment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_payment_id_fkey FOREIGN KEY (payment_id) REFERENCES public.payment_details(id);


--
-- Name: order_details order_details_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.order_details(id);


--
-- Name: order_items order_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: shopping_session shopping_session_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_session
    ADD CONSTRAINT shopping_session_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: user_address user_address_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_address
    ADD CONSTRAINT user_address_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: user_payment user_payment_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_payment
    ADD CONSTRAINT user_payment_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- PostgreSQL database dump complete
--

