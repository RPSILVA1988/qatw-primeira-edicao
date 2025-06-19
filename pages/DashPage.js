export class DashPage{
    constructor(page){
        this.page = page
    }

    async obterSaldo() {
        return await this.page.locator('#account-balance').textContent();
    
    }
}
