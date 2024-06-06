--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

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
\.


--
-- Data for Name: product_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_category (id, name, created_at, modified_at, deleted_at) FROM stdin;
0	Action	2024-06-02 19:49:41.214	\N	\N
1	Add-on	2024-06-02 19:49:41.214	\N	\N
2	Adventure	2024-06-02 19:49:41.214	\N	\N
3	Compilation	2024-06-02 19:49:41.214	\N	\N
4	Educational	2024-06-02 19:49:41.214	\N	\N
5	Gambling	2024-06-02 19:49:41.214	\N	\N
6	Idle	2024-06-02 19:49:41.214	\N	\N
7	Puzzle	2024-06-02 19:49:41.214	\N	\N
8	Racing / Driving	2024-06-02 19:49:41.214	\N	\N
9	Role-playing (RPG)	2024-06-02 19:49:41.214	\N	\N
10	Simulation	2024-06-02 19:49:41.214	\N	\N
11	Special edition	2024-06-02 19:49:41.214	\N	\N
12	Sports	2024-06-02 19:49:41.214	\N	\N
13	Strategy / tactics	2024-06-02 19:49:41.214	\N	\N
\.


--
-- Data for Name: product_inventory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_inventory (id, quantity, created_at, modified_at, deleted_at) FROM stdin;
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
\.


--
-- Data for Name: user_address; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_address (id, user_id, address_line1, address_line2, city, postal_code, country, telephone, mobile) FROM stdin;
\.


--
-- Data for Name: user_payment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_payment (id, user_id, payment_type, provider, account_no, expiry) FROM stdin;
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

