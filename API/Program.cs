using APIrestfullC_.Properties.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// CORS para o front
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFront", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader();
            // .AllowCredentials();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// DbContext -> usa a connection string "DefaultConnection"
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Swagger só em dev
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// CORS antes de auth/pipelines
app.UseCors("AllowFront");

// Em Docker (sem TLS), não redirecionar para HTTPS
// app.UseHttpsRedirection();

app.UseAuthorization();

// Health endpoint para o docker-compose healthcheck
app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

// (opcional, recomendado) aplicar migrations ao subir
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

app.MapControllers();
app.Run();
