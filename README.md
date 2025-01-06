**README.md (Prettier Section)**

## 🛠 **Code Formatting with Prettier**

This project uses **Prettier** to automatically format the code. It helps maintain clean, consistent, and standardized code effortlessly.

### **🔧 Prettier Configuration:**
- Configuration file: `.prettierrc`.
- You can manually format the code using the shortcut **Ctrl + Alt + Shift + P** in WebStorm.

### **📦 Command for Manual Formatting:**
To manually run Prettier for the entire project, use the following command:
```bash
npx prettier --write .
```

### **⚙️ Prettier Configuration File:**
**.prettierrc**
```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "trailingComma": "none",
  "bracketSpacing": true
}
```

### **📄 How Formatting Works in WebStorm:**
1. Prettier automatically formats the code when the **Ctrl + Alt + Shift + P** shortcut is used.
2. You can also configure WebStorm to format the code automatically on file save.

### **Why is Prettier Important?**
- Ensures consistent code formatting across the project.
- Makes the project easier to maintain and improves code readability.
- Eliminates manual formatting and saves developer time.
