import { defineQuery } from "next-sanity";

export const USER_BY_ID_QUERY =
  defineQuery(`*[_type == 'user' && id == $id ][0]{
    _id,
    id,
    name,
    image,
    email
  }`);

export const TESTS_QUERY =
  defineQuery(`*[_type == 'question' && defined(slug.current)  ]{
    _createdAt,
    slug,
    questions,
    author -> {name, username, _id, image},
    _id,
  
}`);

export const TEST_BY_ID_QUERY =
  defineQuery(`*[_type == 'question' && _id == $id][0]{
    _createdAt,
    slug,
    questions,
    _id,
  
}`);
