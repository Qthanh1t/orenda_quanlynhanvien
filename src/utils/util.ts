import type {Employee} from "../model/Employee.ts";

export function removeVietnameseTones(str: string): string {
    return str
        .normalize("NFD") // tách ký tự có dấu thành base + dấu
        .replace(/[\u0300-\u036f]/g, "") // xóa dấu
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
}
export const employeesFilter = (employees: Employee[], searchTerm: string, selectedTitle: string) => {
    return employees.filter((employee) => {
        const matchSearch = removeVietnameseTones(employee.name.toLowerCase()).includes(removeVietnameseTones(searchTerm.toLowerCase()))
        const matchTitle = selectedTitle ? employee.title.toLowerCase().includes(selectedTitle.toLowerCase()) : true;
        return matchSearch && matchTitle;
    });
}