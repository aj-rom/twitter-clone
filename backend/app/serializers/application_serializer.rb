class ApplicationSerializer
  include FastJsonapi::ObjectSerializer

  def to_h
    data = serializable_hash
    case data[:data]
    when Hash
      data[:data][:attributes]
    when Array
      data[:data].map{ |x| x[:attributes] }
    when nil
      nil
    else
      data
    end
  end

  class << self
    def has_one(resource, options = {})
      serializer = options[:serializer] || "#{resource.to_s.classify}Serializer".constantize

      attribute resource do |object|
        serializer.new(object.try(resource)).to_h
      end
    end

    def has_many(resources, options = {})
      serializer = options[:serializer] || "#{resources.to_s.classify}Serializer".constantize

      attribute resources do |object|
        serializer.new(object.try(resources)).to_h
      end
    end
  end
end