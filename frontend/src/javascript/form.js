// Dynamic Method for Form.io implementation
export default function getFormJSON(label, placeholder, description, hidden = false, postId = 0) {

    // Form Settings
    const contentValidation = {
        "required": true,
        "maxLength": 500,
        "minLength": 5
    }
    const nameSettings = {
        "label": "Name",
        "labelPosition": "left-left",
        "placeholder": "Name",
        "description": "Your full name.",
        "tableView": true,
        "validate": {
            "required": true,
            "maxLength": 100,
            "minLength": 5
        },
        "key": "name",
        "type": "textfield",
        "input": true
    }
    const formSettings = {
        "pdf": {
            "id": "1ec0f8ee-6685-5d98-a847-26f67b67d6f0",
            "src": "https://files.form.io/pdf/5692b91fd1028f01000407e3/file/1ec0f8ee-6685-5d98-a847-26f67b67d6f0"
        }
    }
    const submitButtonJson = {
        "type": "button",
        "label": "Submit",
        "key": "submit",
        "disableOnInvalid": true,
        "input": true,
        "tableView": false
    }

    let json = {
        "display": "form",
        "settings": formSettings,
        "components": [
            nameSettings,
            {
                "label": label,
                "placeholder": placeholder,
                "description": description,
                "autoExpand": false,
                "tableView": true,
                "validate": contentValidation,
                "key": "content",
                "type": "textarea",
                "input": true
            }, submitButtonJson

        ]
    }

    if (hidden) {
        json.components.push({
            "label": "post_id",
            "defaultValue": postId.toString(),
            "key": "post_id",
            "type": "hidden",
            "input": true,
            "tableView": false
        })
    }

    return json
}

