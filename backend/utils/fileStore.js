import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";


const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const FILE_PATH = path.join(dirname, "../messages.json");
let writeQueue = Promise.resolve();
export async function readMessages() {
  try {
    const data = await fs.readFile(FILE_PATH,"utf-8")
    return JSON.parse(data)
  } catch (err) {
    return []
  }
}

function writeMessages(messages){writeQueue=writeQueue.then(()=>
    fs.writeFile(FILE_PATH, JSON.stringify(messages, null, 2))
  )
  return writeQueue
}

export async function addMessage(message) {
  const messages = await readMessages()
  messages.push(message);
  if (messages.length > 100) {
    messages.shift();
  }
  await writeMessages(messages);
  return message;
}