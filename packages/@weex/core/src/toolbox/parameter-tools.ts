import { equals, is, merge } from 'ramda'
import * as yargsParse from 'yargs-parser'
import { IParameters } from '../core/toolbox'
import { Options } from '../core/options'

const COMMAND_DELIMITER = ' '

/**
 * Parses given command arguments into a more useful format.
 *
 * @param commandArray Command string or list of command parts.
 * @param extraOpts Extra options.
 * @returns Normalized parameters.
 */
export function parseParams(commandArray: string | string[], extraOpts: Options = {}): IParameters {
  // use the command line args if not passed in
  if (is(String, commandArray)) {
    commandArray = (commandArray as string).split(COMMAND_DELIMITER)
  }

  // remove the first 2 args if it comes from process.argv
  if (equals(commandArray, process.argv)) {
    commandArray = commandArray.slice(2)
  }

  // chop it up yargsParse!
  const parsed = yargsParse(commandArray)
  const array = parsed._.slice()
  delete parsed._
  const options = merge(parsed, extraOpts)
  return { array, options }
}

/**
 * Constructs the parameters object.
 *
 * @param params Provided parameters
 * @return An object with normalized parameters
 */
export function createParams(params: any): IParameters {
  // make a copy of the args so we can mutate it
  const array: string[] = params.array.slice()

  const [first, second, third] = array

  // the string is the rest of the words
  const finalString = array.join(' ')

  // :shipit:
  return {
    ...params,
    array,
    first,
    second,
    third,
    string: finalString,
  }
}
