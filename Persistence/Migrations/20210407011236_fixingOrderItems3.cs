using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class fixingOrderItems3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItemProduct_OrderedItems_OrderItemsId",
                table: "OrderItemProduct");

            migrationBuilder.DropTable(
                name: "OrderedItems");

            migrationBuilder.RenameColumn(
                name: "OrderItemsId",
                table: "OrderItemProduct",
                newName: "OrderId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderItemProduct_OrderItemsId",
                table: "OrderItemProduct",
                newName: "IX_OrderItemProduct_OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItemProduct_Orders_OrderId",
                table: "OrderItemProduct",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItemProduct_Orders_OrderId",
                table: "OrderItemProduct");

            migrationBuilder.RenameColumn(
                name: "OrderId",
                table: "OrderItemProduct",
                newName: "OrderItemsId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderItemProduct_OrderId",
                table: "OrderItemProduct",
                newName: "IX_OrderItemProduct_OrderItemsId");

            migrationBuilder.CreateTable(
                name: "OrderedItems",
                columns: table => new
                {
                    OrderItemsId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderId = table.Column<int>(type: "int", nullable: true),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    ordered = table.Column<int>(type: "int", nullable: false),
                    totalCost = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderedItems", x => x.OrderItemsId);
                    table.ForeignKey(
                        name: "FK_OrderedItems_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderedItems_OrderId",
                table: "OrderedItems",
                column: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItemProduct_OrderedItems_OrderItemsId",
                table: "OrderItemProduct",
                column: "OrderItemsId",
                principalTable: "OrderedItems",
                principalColumn: "OrderItemsId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
