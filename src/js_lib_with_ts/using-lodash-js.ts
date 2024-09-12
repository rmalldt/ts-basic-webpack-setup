/**
 * Exampple of using third-party JS library with TS.
 */
import _ from 'lodash';

export function shuffleArray<T>(arr: T[]) {
  console.log(_.shuffle(arr));
}
