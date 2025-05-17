
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet publish -c Release -o /app/publish


FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .


RUN addgroup --system stevejobs && adduser --system --ingroup stevejobs stevejobs


USER stevejobs

ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000
CMD ["dotnet", "APIrestfullC#.dll"]
