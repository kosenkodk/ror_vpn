json.extract! tariff_plan, :id, :title, :price, :duration, :price_duration, :price_duration_sale, :price_comment, :features, :created_at, :updated_at
json.url tariff_plan_url(tariff_plan, format: :json)
