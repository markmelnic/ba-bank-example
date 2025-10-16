class BankAccount {
  constructor(accountNumber, accountHolder, initialBalance = 0) {
    if (typeof accountNumber !== 'string' && typeof accountNumber !== 'number') {
      throw new TypeError('accountNumber must be a string or number');
    }
    if (!accountHolder || typeof accountHolder !== 'string') {
      throw new TypeError('accountHolder must be a non-empty string');
    }
    if (typeof initialBalance !== 'number' || Number.isNaN(initialBalance)) {
      throw new TypeError('initialBalance must be a valid number');
    }
    if (initialBalance < 0) {
      throw new RangeError('initialBalance cannot be negative');
    }

    this.accountNumber = accountNumber;
    this.accountHolder = accountHolder;
    this._balance = initialBalance;
  }

  deposit(amount) {
    this.#validateAmount(amount);
    this._balance += amount;
    return this._balance;
  }

  withdraw(amount) {
    this.#validateAmount(amount);
    if (amount > this._balance) {
      throw new RangeError('Insufficient funds');
    }
    this._balance -= amount;
    return this._balance;
  }

  transfer(amount, targetAccount) {
    if (!(targetAccount instanceof BankAccount)) {
      throw new TypeError('targetAccount must be an instance of BankAccount');
    }
    this.withdraw(amount);
    targetAccount.deposit(amount);
    return this._balance;
  }

  checkBalance() {
    return this._balance;
  }

  #validateAmount(amount) {
    if (typeof amount !== 'number' || Number.isNaN(amount)) {
      throw new TypeError('Amount must be a valid number');
    }
    if (amount <= 0) {
      throw new RangeError('Amount must be greater than zero');
    }
  }
}

module.exports = BankAccount;

if (require.main === module) {
  const primary = new BankAccount('0001', 'Alice', 500);
  const secondary = new BankAccount('0002', 'Bob', 250);

  primary.deposit(200);
  primary.withdraw(100);
  primary.transfer(150, secondary);

  console.log(`Alice balance: $${primary.checkBalance()}`);
  console.log(`Bob balance: $${secondary.checkBalance()}`);
}
