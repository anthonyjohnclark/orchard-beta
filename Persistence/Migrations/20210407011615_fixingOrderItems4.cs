using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class fixingOrderItems4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "ordered",
                table: "OrderItemProduct",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "totalCost",
                table: "OrderItemProduct",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ordered",
                table: "OrderItemProduct");

            migrationBuilder.DropColumn(
                name: "totalCost",
                table: "OrderItemProduct");
        }
    }
}
