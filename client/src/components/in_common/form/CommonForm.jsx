import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import React from "react";

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  buttonText,
  onSubmit,
}) => {
  console.log(formData);
  function renderInputsByComponentType(formItem) {
    let element = null;
    const value = formData[formItem.name] || "";
    switch (formItem.htmlType) {
      case "input":
        element = (
          <Input
            name={formItem.name}
            placeholder={formItem.placeholder}
            id={formItem.name}
            type={formItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [formItem.name]: event.target.value,
              })
            }
          />
        );

        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [formItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={formItem.label} />
            </SelectTrigger>
            <SelectContent>
              {formItem.options && formItem.options.length > 0
                ? formItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );

        break;
      case "textarea":
        element = (
          <Textarea
            name={formItem.name}
            placeholder={formItem.placeholder}
            id={formItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [formItem.name]: event.target.value,
              })
            }
          />
        );

        break;

      default:
        element = (
          <Input
            name={formItem.name}
            placeholder={formItem.placeholder}
            id={formItem.name}
            type={formItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [formItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {formControls.map((formItem) => {
        return (
          <div key={formItem.name} className="flex flex-col gap-4">
            <Label>{formItem.label}</Label>
            {renderInputsByComponentType(formItem)}
          </div>
        );
      })}
      <Button className="mt-4 w-full rounded-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
