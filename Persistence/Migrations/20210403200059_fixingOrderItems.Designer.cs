﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

namespace Persistence.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20210403200059_fixingOrderItems")]
    partial class fixingOrderItems
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.4")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Domain.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("dateOrdered")
                        .HasColumnType("datetime2");

                    b.Property<double>("orderTotal")
                        .HasColumnType("float");

                    b.Property<int>("piecesOrdered")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("Domain.OrderItems", b =>
                {
                    b.Property<int>("OrderItemsId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("OrderId")
                        .HasColumnType("int");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<int>("ordered")
                        .HasColumnType("int");

                    b.Property<double>("totalCost")
                        .HasColumnType("float");

                    b.HasKey("OrderItemsId");

                    b.HasIndex("OrderId");

                    b.HasIndex("ProductId")
                        .IsUnique();

                    b.ToTable("OrderedItems");
                });

            modelBuilder.Entity("Domain.Product", b =>
                {
                    b.Property<int>("ProductId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("caseSize")
                        .HasColumnType("int");

                    b.Property<double>("cost")
                        .HasColumnType("float");

                    b.Property<double>("expectedFloor")
                        .HasColumnType("float");

                    b.Property<double>("expectedInv")
                        .HasColumnType("float");

                    b.Property<double>("fill")
                        .HasColumnType("float");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("netGIG")
                        .HasColumnType("float");

                    b.Property<bool>("onSale")
                        .HasColumnType("bit");

                    b.Property<bool>("organic")
                        .HasColumnType("bit");

                    b.Property<double>("par")
                        .HasColumnType("float");

                    b.Property<double>("percentSales")
                        .HasColumnType("float");

                    b.Property<bool>("productActive")
                        .HasColumnType("bit");

                    b.Property<double>("retailPrice")
                        .HasColumnType("float");

                    b.Property<double>("shrink")
                        .HasColumnType("float");

                    b.Property<double>("sold")
                        .HasColumnType("float");

                    b.Property<string>("soldBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("vin")
                        .HasColumnType("float");

                    b.HasKey("ProductId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("Domain.OrderItems", b =>
                {
                    b.HasOne("Domain.Order", "Order")
                        .WithMany("orderedProducts")
                        .HasForeignKey("OrderId");

                    b.HasOne("Domain.Product", "Product")
                        .WithOne("OrderItems")
                        .HasForeignKey("Domain.OrderItems", "ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Order");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("Domain.Order", b =>
                {
                    b.Navigation("orderedProducts");
                });

            modelBuilder.Entity("Domain.Product", b =>
                {
                    b.Navigation("OrderItems");
                });
#pragma warning restore 612, 618
        }
    }
}
