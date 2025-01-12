import { defineQuery } from "next-sanity";

export const USER_BY_ID_QUERY =
  defineQuery(`*[_type == 'user' && id == $id ][0]{
    _id,
    id,
    name,
    image,
    email,
    role
  }`);

export const TESTS_QUERY =
  defineQuery(`*[_type == 'question' && defined(slug.current)  ]{
    _createdAt,
    slug,
    questions,
    title,
    author -> {name, username, _id, image},
    _id,
  
}`);

export const TEST_BY_ID_QUERY =
  defineQuery(`*[_type == 'question' && _id == $id][0]{
    _createdAt,
    slug,
    questions,
    _id,
    title,
    author -> {name, username, _id, image},
}`);

export const RESULTS_BY_ID_QUERY =
  defineQuery(`*[_type == 'answeredTest' && id == $id][0]{
  answers,
  
}`);
