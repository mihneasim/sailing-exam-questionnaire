import * as events from 'node:events';
import * as fs from 'node:fs';
import * as readline from 'node:readline';

const filename = process.argv[2];

if (!filename) {
    console.log("Supply input filename containing questionnaire data");
    process.exit();
}

console.log("Processing ", filename);

async function processLineByLine() {
  const data = [];
  let question = {};
  let answer = {};
  let counter = 0;
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream(filename),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      //console.log(`Line from file: ${line}`);
      counter++;
      if (counter >= 8) {
        switch (counter % 7) {
          case 0:
            answer.correct = !!parseInt(line.trim());
            data.push(question);
            break;
          case 1:
            question = {text: line.trim(), answers: []};
            break;
          case 2:
          case 4:
          case 6:
           answer = {text: line.trim()};
           question.answers.push(answer);
          break;
          case 3:
          case 5:
            answer.correct = !!parseInt(line.trim());
          break;
        }
      }
    });

    await events.once(rl, 'close');
    //console.log(JSON.stringify(data, null, 2));
    return data;

  } catch (err) {
    console.error(err);
    process.exit();
  }
}

const result = await processLineByLine();
const lastSegment = filename.substr(filename.lastIndexOf('/')+1);
const outputFile = 'data/' + lastSegment.substr(0, lastSegment.lastIndexOf('.')) + '.json';

fs.writeFile(outputFile, JSON.stringify(result, null, 2), 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }

    console.log(`JSON file ${outputFile} has been saved.`);
});

