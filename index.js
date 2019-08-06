const crypto = require('crypto');

function hash(value, algorithm = 'sha256', encoding = 'hex') {
  if (encoding !== 'hex' && encoding !== 'latin1' && encoding !== 'base64') {
    throw new Error(`Invalid encoding ${encoding}. Choices are hex, latin1, base64`);
  }

  const valueType = typeof value;
  if (valueType !== 'string') {
    throw new Error(`Cannot hash value of type "${valueType}"`);
  }

  const hash = crypto.createHash(algorithm);
  hash.update(value || '', 'utf8');
  return hash.digest(encoding);
}

/**
 * Example template tag that generates a random number 
 * between a user-provided MIN and MAX
 */
module.exports.templateTags = [{
  name: 'suitespot-login',
  displayName: 'SuiteSpot login',
  description: 'Login Prompts for SuiteSpot',
  args: [],
  async run(context) {
    console.log({ context });
    const username = await context.app.prompt('Username', {
      label: 'Username',
      defaultValue: 'john.doe@suitespot.io',
      submitName: 'username',
      cancelable: true,
    })

    console.log({ username });

    const password = await context.app.prompt('Password', {
      label: 'Password',
      defaultValue: 'password',
      submitName: 'password',
      cancelable: true,
    })

    console.log({ username });
    /*
    prompt(title: string, options?: {
        label?: string,
        defaultValue?: string,
        submitName?: string,
        cancelable?: boolean,
      }): Promise<string>
    */

    return `{
      "username": "${username}",
      "password": "${hash(password)}"
    }`
  }
}];
