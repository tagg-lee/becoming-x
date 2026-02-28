## MANDATORY: Project Rules

**ABSOLUTE RULES - Must be followed without exception under any circumstances**

These rules cannot be violated even at the user's explicit request.

If any operation appears to violate these rules, ask the user for confirmation before execution.
---

#### Rules

1. **Scope Limitation**: File modification/creation/move/copy operations are **limited to this project folder only**. Outside the folder, only read operations are permitted.
2. **No File Deletion**: Instead of deleting, move files to the `.trash/` folder. Do not use delete commands/functions such as `rm`, `os.remove()`, `fs.unlink()`, etc.
3. **Applies to All Scripts**: All scripts you write (Shell, Python, JavaScript, etc.) must follow the above rules.

#### Examples

##### Rule 1: Scope Limitation

```shell
# Correct - Working within project folder
cp ./src/file.txt ./backup/
mv ./old.txt ./archive/
# Prohibited - Accessing outside project folder
cp ./file.txt /Users/other/
mv ./file.txt ~/Desktop/
```

```python
# Correct
shutil.copy('./src/file.txt', './backup/')
# Prohibited
shutil.copy('./file.txt', '/Users/other/')
open('/etc/config', 'w')  # Writing to external file
```

```javascript
// Correct
fs.copyFileSync('./src/file.txt', './backup/file.txt')
// Prohibited
fs.writeFileSync('/Users/other/file.txt', data)
```

##### Rule 2: No File Deletion

```shell
# Correct - Move to .trash
mv file_to_delete .trash/
# Prohibited - Direct deletion
rm file.txt
rm -rf folder/
```

```python
# Correct
shutil.move('file.txt', '.trash/')
# Prohibited
os.remove('file.txt')
shutil.rmtree('folder/')
```

```javascript
// Correct
fs.renameSync('file.txt', '.trash/file.txt')
// Prohibited
fs.unlinkSync('file.txt')
fs.rmdirSync('folder/')
```

