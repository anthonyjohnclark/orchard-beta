using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class dataupdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    organic = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    onSale = table.Column<bool>(nullable: false),
                    soldBy = table.Column<string>(nullable: true),
                    caseSize = table.Column<int>(nullable: false),
                    retailPrice = table.Column<double>(nullable: false),
                    sold = table.Column<double>(nullable: false),
                    shrink = table.Column<double>(nullable: false),
                    expectedInv = table.Column<double>(nullable: false),
                    expectedFloor = table.Column<double>(nullable: false),
                    par = table.Column<double>(nullable: false),
                    productActive = table.Column<bool>(nullable: false),
                    cost = table.Column<double>(nullable: false),
                    percentSales = table.Column<double>(nullable: false),
                    netGIG = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
