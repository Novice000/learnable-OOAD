class Bank {
    static validBankNames: string[] = ["Access Bank", "Zenith Bank", "GT Bank"];
    readonly bankName: string;
    readonly fullName: string;
    private readonly accountNumber: string;
    private pin: string;
    private balance: number;

    constructor({ bankName, fullName, pin }: { bankName: string; fullName: string; pin: string }) {
        this.accountNumber = Bank.generateAccountNumber( bankName );
        this.bankName = Bank.validBankNames.includes(bankName) ? bankName : "invalid bank name";
        this.balance = 0;
        this.pin = Bank.validatePin( pin );
        this.fullName = fullName;
    }

    deposit(amount: number) {
        if (amount <= 0) {
            throw new Error("Deposit amount must be positive");
        }
        this.balance += amount;
        return this.balance;
    }

    withdraw(amount: number, pin: string) {
        if (amount <= 0){
            throw new Error("Withdrawal amount must be greater than 0");
        }
        if (pin !== this.pin){
            throw new Error("Invalid pin");
        }
        if (amount > this.balance){
            throw new Error("Insufficient balance");
        }
        this.balance -= amount;
    }

    get getBalance() {
        return this.balance;
    }

    get getAccountNumber() {
        return this.accountNumber;
    }

    get getFullName() {
        return this.fullName;
    }

    transfer({ account, amount, pin }: { account: Bank; amount: number; pin: string }) {
        if (!(account instanceof Bank)) {
            throw new Error("Invalid account");
        }
        this.withdraw(amount, pin);
        account.deposit(amount);
    }

    static generateAccountNumber( bankName: string ) {
        if (!Bank.validBankNames.includes(bankName)) {
            throw new Error("Invalid bank name");
        }

        const prefix = bankName === "Access Bank" ? "189" : bankName === "Zenith Bank" ? "221" : "002";
        return `${prefix}${Math.floor(Math.random() * 10000000).toString().padStart(6, '0')}`;
    }

    static validatePin( pin: string ) { 
        // doesn't work
        // try {
        //     const testpin: number  = parseInt(pin);
        // } catch (error) {
        //     throw new Error("Invalid pin, must be a number");
        // } 
        const pinRegex = /^\d{4}$/;
        if (!pinRegex.test(pin)) {
            throw new Error("Invalid pin, must be a 4 digit number");
        }

        if (pin.length !== 4) {
            throw new Error("Invalid pin, must be 4 digits");
        }
        return pin;
    }
}


class Person {
    static race = "Human"; //didn't know static property to add
    fullName: string;
    age: number;
    constructor({fullName, age} : {fullName: string, age: number}) {
        this.fullName = fullName;
        this.age = age;
    }

    get getFullName() {
        return this.fullName;
    }

    get getAge() {
        return this.age;
    }

    set setFullName(fullName: string) {
        this.fullName = fullName;
    }

    createAccount(bankName: string, pin: string) {
        if(this.age > 18) {
        return new Bank({ bankName: bankName, fullName: this.fullName, pin: pin} );
    } else {
        throw new Error("You must be 18 or older to create an account");
    }
}
}

const myAccess = new Bank({
    bankName: "Access Bank",
    fullName: "John Doe",
    pin: "1234"
});

const myZenith = new Bank({
    bankName: "Zenith Bank",
    fullName: "Jane Doe",
    pin: "4321"
}); 

const myGT = new Bank({
    bankName: "GT Bank",
    fullName: "Jean Dane",
    pin: "2134"
});

// const myErrorAccount = new Bank({
//     bankName: "Zenith Bank",
//     fullName: "John Doe",
//     pin: "12f4" 
// })

myAccess.deposit(1000);
myZenith.deposit(2000);
myGT.deposit(3000);

console.log(myAccess.getBalance)
console.log(myAccess.getAccountNumber)
myGT.transfer({ account: myZenith, amount: 500, pin: "2134" });
console.log(myGT.getBalance)
console.log(myZenith.getBalance)


const efemena = new Person({
    fullName: "Efemena Maxwell Esegbue",
    age: 22
})

const emmanuel = new Person({
    fullName: "Emmanuel Esegbue",
    age: 17
})

console.log(efemena.getFullName)
console.log(efemena.getAge)
efemena.setFullName = "Efemena Maxwell Esegbue"
console.log(efemena.getFullName)
const efemenaAccount = efemena.createAccount("Zenith Bank", "1234")
console.log(efemenaAccount?.deposit(1000))
console.log(efemenaAccount?.getBalance)
const emmanuelAccount = emmanuel.createAccount("Access Bank", "1234")
console.log(emmanuelAccount?.deposit(1000))
console.log(emmanuelAccount?.getBalance)
