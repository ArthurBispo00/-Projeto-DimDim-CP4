using APIrestfullC_.Properties.Data; // Certifique-se que este namespace está correto
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 1) Registra política de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFront", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000") // URL do seu front
            .AllowAnyMethod()
            .AllowAnyHeader();
            // .AllowCredentials(); // Adicione esta linha se precisar enviar cookies/autenticação
    });
});

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Ativa o Swagger só em desenvolvimento
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ATENÇÃO: Ative o CORS aqui, ANTES de qualquer redirecionamento/authorization
app.UseCors("AllowFront");

// Se NÃO estiver usando HTTPS no Docker, pode comentar a próxima linha:
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
