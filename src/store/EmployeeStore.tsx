import {makeAutoObservable, runInAction} from "mobx";
import type {Employee} from "../model/Employee.ts";
import {employeeApi} from "../api/employeeApi.ts";
import {employeesFilter, modifyEmployeeCode} from "../utils/util.ts";


class EmployeeStore {
    listEmployees: Employee[] = [];
    isLoading: boolean = false;
    error: string | null = null;
    searchTerm: string = "";
    selectedTitle: string = "";
    page: number = 1;
    pageSize: number = 8;

    constructor() {
        makeAutoObservable(this);
    }

    setPage = (page: number) => {
        this.page = page;
    }

    setSearchTerm = (term: string) => {
        this.searchTerm = term;
        this.page = 1;
    }

    setSelectedTitle = (title: string) => {
        this.selectedTitle = title;
        this.page = 1;
    }

    get count() {
        return this.listEmployees.length;
    }

    setEmployees(employees: Employee[]) {
        this.listEmployees = employees;
    }

    fetchListEmployees = async () => {
        this.isLoading = true;
        try {
            const res = await employeeApi.getAll()
            runInAction(() => {
                this.listEmployees = res;
            })
        } catch (error) {
            if (error instanceof Error) {
                runInAction(() => {
                    this.error = error.message;
                })
            } else {
                runInAction(() => {
                    this.error = String(error);
                })
            }
        } finally {
            runInAction(() => {
                this.isLoading = false;
            })
        }
    }

    getEmployeeById = async (employeeId: number) => {
        this.isLoading = true;
        try {
            return await employeeApi.getEmployeeById(Number(employeeId));
        } catch (error) {
            if (error instanceof Error) {
                runInAction(() => {
                    this.error = error.message;
                })
            } else {
                runInAction(() => {
                    this.error = String(error);
                })
            }
        } finally {
            runInAction(() => {
                this.isLoading = false;
            })
        }
    }

    deleteEmployee = async (employeeId: number) => {
        try {
            await employeeApi.deleteEmployeeById(employeeId)
            runInAction(() => {
                this.listEmployees = this.listEmployees.filter(e => e.id !== employeeId);
            });
        } catch (error) {
            if (error instanceof Error) {
                runInAction(() => {
                    this.error = error.message;
                })
            } else {
                runInAction(() => {
                    this.error = String(error);
                })
            }
        }
    }

    createEmployee = async (employee: Employee) => {
        try {
            let newEmployee = await employeeApi.createEmployee(employee);
            newEmployee = await employeeApi.updateEmployee(newEmployee.id, modifyEmployeeCode(newEmployee));
            runInAction(() => {
                this.listEmployees.push(newEmployee);
            });
        } catch (error) {
            if (error instanceof Error) {
                runInAction(() => {
                    this.error = error.message;
                })
            } else {
                runInAction(() => {
                    this.error = String(error);
                })
            }
        }
    };

    updateEmployee = async (id: number, updated: Employee) => {
        try {
            const updatedEmployee = await employeeApi.updateEmployee(id, updated);
            runInAction(() => {
                const index = this.listEmployees.findIndex(e => e.id === id);
                if (index >= 0) this.listEmployees[index] = updatedEmployee;
            });
        } catch (error) {
            if (error instanceof Error) {
                runInAction(() => {
                    this.error = error.message;
                })
            } else {
                runInAction(() => {
                    this.error = String(error);
                })
            }
        }
    };

    deleteAllEmployee = () => {
        this.listEmployees = []
    }

    get filteredEmployees() {
        return employeesFilter(this.listEmployees, this.searchTerm, this.selectedTitle);
    }

    get paginatedEmployees() {
        const startIndex = (this.page - 1) * this.pageSize;
        return this.filteredEmployees.slice(startIndex, startIndex + this.pageSize);
    }
}

export const employeeStore = new EmployeeStore();