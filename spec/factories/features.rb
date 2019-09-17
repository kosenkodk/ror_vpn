FactoryBot.define do
  factory :feature do
    # icon_name {'no_logs.png'}
    is_published {true} 
    order {10}
    title {'NO LOGS'}
    subtitle {'Your privacy is and will always be our first priority'}
    text {"VEGA never tracks personal information or logs your online activity as verified by a team of independent security auditors."}
  end
end
