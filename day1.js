const fs = require("fs")
const readline = require("readline")

const solution = async () => {
  //   const col1 = ["3", "4", "2", "1", "3", "3"]
  //   const col2 = ["4", "3", "5", "3", "9", "3"]
  const col1 = []
  const col2 = []

  //Create file input stream
  const processFile = (col1, col2) => {
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
  await processFile(col1, col2)

  col1.sort((a, b) => a - b)
  col2.sort((a, b) => a - b)

  let distances = 0
  for (let i = 0; i < col1.length; i++) {
    distances += Math.abs(col1[i] - col2[i])
  }
  return distances
}

console.log(solution())
