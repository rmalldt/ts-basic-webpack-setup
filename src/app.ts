import { ProjectInput } from './components/project-input';
import { ProjectList } from './components/project-list';

//// Initialize App
new ProjectInput();
new ProjectList('active');
new ProjectList('finished');

/***************************************************************
 * Third party js library with ts
 */
import { shuffleArray } from './js_lib_with_ts/using-lodash-js';
shuffleArray([1, 2, 3]);

/***************************************************************
 * The 'declare' keyword example
 */
declare var GLOBAL: any;
console.log(GLOBAL);
console.log('Hello');

/***************************************************************
 * Class Transformer example
 *  - Common use case is that we get data from API which we
 *    would then transform into our data model.
 */
import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { Product } from './js_lib_with_ts/product.model';

// Data from server
const dataFromApi = [
  { title: 'A book', price: 12.99 },
  { title: 'A carpet', price: 29.99 },
];

// Manual Approach:
// const loadedProducts = dataFromApi.map((data) => {
//   return new Product(data.title, data.price); // transform
// });
// loadedProducts.forEach((product) => console.log(product.getInformation()));

// Using class-transformer
const loadedProducts = plainToInstance(Product, dataFromApi);
loadedProducts.forEach((product: Product) =>
  console.log(product.getInformation())
);

/***************************************************************
 * Class Validator example
 *  - Data validation is necessary in any real world projects.
 *  - class-validator uses decorators that can be used out of
 *    the box to validate data.
 */
import { validate } from 'class-validator';
const product1 = new Product('', -20.99);
validate(product1).then((errors) => {
  if (errors.length > 0) {
    console.log('Validation ERRORS!');
    console.log(errors);
  } else {
    console.log(product1.getInformation());
  }
});
