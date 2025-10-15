import {makeAutoObservable, reaction, runInAction} from "mobx";
import type {Employee} from "../model/Employee.ts";
import {employeeApi} from "../api/employeeApi.ts";
import {modifyEmployeeCode} from "../utils/util.ts";
import {debounce} from "lodash"

class EmployeeStore {
    listEmployees: Employee[] = [];
    listTotalEmployees: Employee[] = [];
    isLoading: boolean = false;
    error: string | null = null;
    searchTerm: string = "";
    selectedTitle: string = "";
    page: number = 1;
    pageSize: number = 8;
    numberOfFilteredEmployees: number = 0;
    numberOfEmployees: number = 0;

    constructor() {
        makeAutoObservable(this);
        reaction(
            () => [this.searchTerm, this.selectedTitle, this.page, this.pageSize],
            debounce(async () => {
                await this.fetchListEmployees()
            }, 400)
        )
    }

    //numberOfEmployee de cap nhat trong trang employees, listTotalEmployees de hien thi so nhan vien trong trang Home
    get totalEmployees() {
        return this.numberOfEmployees ? this.numberOfEmployees : this.listTotalEmployees.length
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

    fetchListTotalEmployees = async () => {
        this.isLoading = true;
        try {
            const res = await employeeApi.getAll();
            runInAction(() => {
                this.listTotalEmployees = res;
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

    fetchListEmployees = async () => {
        this.isLoading = true;
        try {
            const res = await employeeApi.getFilteredEmployees(this.page, this.pageSize, this.selectedTitle, this.searchTerm);
            runInAction(() => {
                this.listEmployees = res.data;
                this.numberOfEmployees = res.totalEmployees
                this.numberOfFilteredEmployees = res.numberOfFilteredEmployees
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
        } finally {
            await this.fetchListEmployees()
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
}

export const employeeStore = new EmployeeStore();