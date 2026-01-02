import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://Pranav:Pranav_018@atsresumescanner.sbuvn4m.mongodb.net/CodeMetric_db?retryWrites=true&w=majority';

async function fix() {
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected');

  const Problem = mongoose.model('Problem', new mongoose.Schema({}, { strict: false }));

  await Problem.updateOne(
    { title: 'Group Anagrams' },
    {
      $set: {
        description: "Group anagrams together.\n\nExample:\nInput: ['eat','tea','tan']\nOutput: [['eat','tea'],['tan']]",
        testCases: [
          { 
            input: "strs = ['eat','tea']", 
            expectedOutput: "[['eat','tea']]" 
          },
          { 
            input: "strs = ['a']", 
            expectedOutput: "[['a']]" 
          }
        ],
        starterCode: {
          javascript: `function groupAnagrams(strs) {
    const map = {};
    for (let str of strs) {
        const key = str.split('').sort().join('');
        if (!map[key]) map[key] = [];
        map[key].push(str);
    }
    return Object.values(map);
}
console.log(JSON.stringify(groupAnagrams(strs)));`,
          python: `def group_anagrams(strs):
    map = {}
    for s in strs:
        key = ''.join(sorted(s))
        if key not in map:
            map[key] = []
        map[key].append(s)
    return list(map.values())

import json
print(json.dumps(group_anagrams(strs)))`
        }
      }
    }
  );

  console.log('✅ Fixed - removed const/semicolons for Python compatibility');
  process.exit(0);
}

fix();