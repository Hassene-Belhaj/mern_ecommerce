import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import React from "react";

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  buttonText,
  onSubmit,
  checkFormSubmit,
}) => {
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
            className="bg-white"
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
            <SelectTrigger>
              <SelectValue placeholder={formItem.label} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {formItem.options && formItem.options.length > 0
                  ? formItem.options.map((optionItem, i) => (
                      <SelectItem key={i} value={optionItem.label}>
                        {optionItem.label}
                      </SelectItem>
                    ))
                  : null}
              </SelectGroup>
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
            className="bg-white"
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
            className="bg-white"
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
      <Button
        disabled={checkFormSubmit}
        className="mt-4 h-10 w-full rounded-full"
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
