export const Examples = `

1. oi

<Code language="javascript">
//strings
const names = ["Seema", "Rekha", "Jaya"];
names.sort();
//['Jaya', 'Rekha', 'Seema' ]

//Numbers
const numbers = [101, 8, 87];
numbers.sort((a, b) => {
  return a - b;
});
//[ 8, 87, 101 ]
</Code>

<Code language="javascript">
const items = ["Ball", "Bat", "Cup"]
const randomIndex = Math.floor(Math.random()*items.length)
items[randomIndex]
</Code>

<Code language="javascript">
function reverseString(string) {
  return string.split(" ").reverse().join(" ")
}

reverseString("Random String")
</Code>

<Code language="javascript">
const element = document.querySelector("#element")
element.classList.contains("active")
</Code>

<Code language="javascript">
const name = "Jaya"
console.log(\`Hi, \${name}. You have \${2 ** 3} new notifications.\`)
//Hi, Jaya. You have 8 new notifications.
</Code>

<Code language="javascript">
const cars = ["Ford", "BMW", "Audi" ]
for (let car of cars) {
  console.log(car)
}

/*
Ford
BMW
Audi
*/
</Code>

<Code language="javascript">
const date = new Date()
const currentTime = 
  \`\${date.getHours()}:\${date.getMintues()}:\${date.getSeconds()}\`

console.log(currentTimes)
//example output: "22:16:41"
</Code>

<Code language="javascript">
const string = "You are awesome."
const replacedString = string.replace("You", "We")

console.log(replacedString) //Output: "We are awesome"
</Code>

<Code language="javascript">
let profile = ['bob', 34, 'carpenter'];
let [name, age, job] = profile;
console.log(name);
// bob
</Code>

<Code language="javascript">
let data = [1,2,3,4,5];
console.log(...data);
//  1 2 3 4 5
let data2 = [6,7,8,9,10];
let combined = [...data, ...data2];
console.log(...combined);
// 1 2 3 4 5 6 7 8 9 10
console.log(Math.max(...combined));
// 10
</Code>
`;
