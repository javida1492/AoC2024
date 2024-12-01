const fs = require("fs")
const readline = require("readline")

const processFile = async (col1, col2) => {
  //Create file input stream
  return new Promise((resolve, reject) => {
    const readInterface = readline.createInterface({
      input: fs.createReadStream("day1Input.txt"),
    })

    //Process input file
    readInterface.on("line", (line) => {
      const values = line.split(" ")
      col1.push(values[0])
      col2.push(values[values.length - 1])
    })

    //Close the file
    readInterface.on("close", () => {
      console.log("File processing complete")
      resolve()
    })
    // Handle errors
    readInterface.on("error", (err) => {
      reject(err)
    })
  })
}

const solution = async () => {
  //   const col1 = ["3", "4", "2", "1", "3", "3"]
  //   const col2 = ["4", "3", "5", "3", "9", "3"]
  const col1 = []
  const col2 = []
  const col2Map = new Map()

  await processFile(col1, col2)

  for (const num of col2) {
    if (!col2Map.has(num)) {
      col2Map.set(num, 0)
    }
    col2Map.set(num, col2Map.get(num) + 1)
  }

  let similarityScore = 0
  for (const num of col1) {
    similarityScore += num * (col2Map.has(num) ? col2Map.get(num) : 0)
  }

  //   col1.sort((a, b) => a - b)
  //   col2.sort((a, b) => a - b)

  //   let distances = 0
  //   for (let i = 0; i < col1.length; i++) {
  //     distances += Math.abs(col1[i] - col2[i])
  //   }
  //   return distances
  return similarityScore
}

solution().then((result) => console.log(result))
