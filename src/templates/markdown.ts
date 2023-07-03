export const codeExamples: string[] = [`
<>
<h1>1. Sort an Array</h1>

<p>Ordena um array de strings ou números em ordem crescente.</p>

<div>
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
      //[ 8, 87, 101 ]</Code>
</div>

<h1>2. Select a random element</h1>
<p>Seleciona um elemento aleatório de um array.</p>
<div>
    <Code language="javascript">
      const items = ["Ball", "Bat", "Cup"]
      const randomIndex = Math.floor(Math.random()*items.length)
      items[randomIndex]</Code>
</div>

<h1>3. Reverse a string</h1>
<p>Inverte uma string.</p>
<div>
    <Code language="javascript">
      function reverseString(string) {
        return string.split(" ").reverse().join(" ")
      }

      reverseString("Random String")</Code>
</div>

<h1>4. Check if element has a class</h1>

<p>Verifica se um elemento possui uma determinada classe.</p>

<div>
    <Code language="javascript">
      const element = document.querySelector("#element")
      element.classList.contains("active")</Code>
</div>

<h1>5. String interpolation</h1>
<p>Interpolação de strings - permite inserir valores de variáveis em uma string.</p>
<div>
    <Code language="javascript">
      const name = "Jaya"
      console.log(\`Hi, \${name}. You have \${2 * 3} new notifications.\`)
      //Hi, Jaya. You have 8 new notifications.</Code>
</div>

<h1>6. Loop through an array</h1>
<p>Itera sobre os elementos de um array.</p>
<div>
    <Code language="javascript">
      const cars = ["Ford", "BMW", "Audi" ]
      for (let car of cars) {
        console.log(car)
      }

      /*
      Ford
      BMW
      Audi
      */</Code>
</div>

<h1>7. Get current time</h1>
<p>Obtém o horário atual.</p>
<div>
    <Code language="javascript">
      const date = new Date()
      const currentTime =
        \`\${date.getHours()}:\${date.getMinutes()}:\${date.getSeconds()}\`

      console.log(currentTime)
      //example output: "22:16:41"</Code>
</div>

<h1>8. Replace part of a string</h1>
<p>Substitui uma parte de uma string por outra.</p>
<div>
    <Code language="javascript">
      const string = "You are awesome."
      const replacedString = string.replace("You", "We")

      console.log(replacedString) 
      //Output: "We are awesome"</Code>
</div>

<h1>9. Destructing variable assignment</h1>
<p>Atribuição de variável por desestruturação - extrai valores de um array ou objeto para variáveis separadas.</p>
<div>
    <Code language="javascript">
      let profile = ['bob', 34, 'carpenter'];
      let [name, age, job] = profile;
      console.log(name);
      // bob</Code>
</div>

<div>
    <Code language="javascript">
      let data = [1,2,3,4,5];
      console.log(...data);
      //  1 2 3 4 5
      let data2 = [6,7,8,9,10];
      let combined = [...data, ...data2];
      console.log(...combined);
      // 1 2 3 4 5 6 7 8 9 10
      console.log(Math.max(...combined));
      // 10</Code>
</div>
</>
`,
];
