https://www.askpython.com/python/built-in-methods/read-parse-a-text-file

```python
import json
fp = 'Details.txt'
data = []
with open(fp, 'r') as f:
    header = f.readline()
    for line in f:
        values = line.strip().split(',')
        name, age, date, gender = values
        columns= {
            'Name': name,
            'Age': int(age),
            'Date': date,
            'Gender': gender
        }
        data.append(columns)
jsonstr= json.dumps(data, indent=4)
print(jsonstr)
```

